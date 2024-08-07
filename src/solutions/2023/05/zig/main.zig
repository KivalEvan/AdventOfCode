const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn parseInput(input: []const u8, single: bool) struct { seed_ranges: std.ArrayList([2]i64), src_to_dest_ranges: [7]std.ArrayList([2][2]i64) } {
    var lines = std.mem.splitSequence(u8, input, "\n\n");

    var i: usize = 0;
    var seed_ranges = std.ArrayList([2]i64).init(std.heap.c_allocator);
    var split_it_b = std.mem.splitBackwardsSequence(u8, lines.next().?, ":");
    var split_it = std.mem.splitSequence(u8, split_it_b.next().?, " ");
    while (split_it.next()) |str| {
        if (str.len == 0) continue;
        const num = std.fmt.parseInt(i64, str, 10) catch unreachable;
        if (single) {
            seed_ranges.append(.{ num, num }) catch unreachable;
        } else if (@mod(i, 2) == 0) {
            seed_ranges.append(.{ num, num }) catch unreachable;
        } else {
            seed_ranges.items[@as(usize, @intFromFloat(@floor(@as(f32, @floatFromInt(i)) / 2.0)))][1] += num - 1;
        }
        i += 1;
    }

    i = 0;
    var src_to_dest_ranges: [7]std.ArrayList([2][2]i64) = undefined;
    while (lines.next()) |line| {
        split_it = std.mem.splitSequence(u8, line, "\n");
        _ = split_it.next();
        var groups = std.ArrayList([2][2]i64).init(std.heap.c_allocator);
        while (split_it.next()) |str| {
            var another_split = std.mem.splitSequence(u8, str, " ");
            var j: usize = 0;
            var ary: [3]i64 = .{ 0, 0, 0 };
            while (another_split.next()) |num| {
                ary[j] = std.fmt.parseInt(i64, num, 10) catch unreachable;
                j += 1;
            }
            var ranges: [2][2]i64 = undefined;
            ranges[0] = .{ ary[1], ary[1] + ary[2] - 1 };
            ranges[1] = .{ ary[0], ary[0] + ary[2] - 1 };
            groups.append(ranges) catch unreachable;
        }
        src_to_dest_ranges[i] = groups;
        i += 1;
    }

    return .{ .seed_ranges = seed_ranges, .src_to_dest_ranges = src_to_dest_ranges };
}

fn solve(input: []const u8, single: bool) []const u8 {
    var res: i64 = std.math.maxInt(i64);
    const tuple = parseInput(input, single);
    var seed_ranges: std.ArrayList([2]i64) = tuple.seed_ranges;
    defer seed_ranges.deinit();
    const src_to_dest_ranges: [7]std.ArrayList([2][2]i64) = tuple.src_to_dest_ranges;

    for (src_to_dest_ranges) |groups| {
        defer groups.deinit();
        for (groups.items) |g| {
            var new_seeds = std.ArrayList([2]i64).init(std.heap.c_allocator);
            defer new_seeds.deinit();
            for (0..seed_ranges.items.len) |i| {
                var r = &seed_ranges.items[i];
                if (r[0] < g[0][0] and g[0][0] < r[1]) {
                    new_seeds.append(.{ r[0], g[0][0] - 1 }) catch unreachable;
                    r[0] = g[0][0];
                }
                if (r[0] < g[0][1] and g[0][1] < r[1]) {
                    new_seeds.append(.{ g[0][1] + 1, r[1] }) catch unreachable;
                    r[1] = g[0][1];
                }
            }
            seed_ranges.appendSlice(new_seeds.items) catch unreachable;
        }
        for (0..seed_ranges.items.len) |i| {
            var r = &seed_ranges.items[i];
            var found: ?[2][2]i64 = null;
            for (groups.items) |g| {
                if (g[0][0] <= r[0] and
                    r[0] <= g[0][1] and
                    r[1] >= g[0][0] and
                    g[0][1] >= r[1])
                {
                    found = g;
                    break;
                }
            }
            if (found) |f| {
                const diff = @as(i64, f[1][0] - f[0][0]);
                r[0] += diff;
                r[1] += diff;
            }
        }
    }

    for (seed_ranges.items) |seeds| {
        res = @min(seeds[0], res);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    return solve(input, true);
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    return solve(input, false);
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
