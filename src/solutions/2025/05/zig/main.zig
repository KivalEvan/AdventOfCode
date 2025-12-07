const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn sort(_: void, a: [2]i64, b: [2]i64) bool {
    return a[0] < b[0];
}

fn solve(input: []const u8, is_test: bool, p2: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    var chunks = std.mem.splitSequence(u8, input, "\n\n");
    var chunk = std.mem.splitSequence(u8, chunks.next().?, "\n");

    const allocator = std.heap.c_allocator;
    const rangesBuffer = allocator.alloc([2]i64, 255) catch unreachable;
    defer allocator.free(rangesBuffer);
    var ranges = std.ArrayList([2]i64).initBuffer(rangesBuffer);

    while (chunk.next()) |line| {
        var range: [2]i64 = undefined;
        var it = std.mem.splitSequence(u8, line, "-");
        range[0] = std.fmt.parseInt(i64, it.next().?, 10) catch unreachable;
        range[1] = std.fmt.parseInt(i64, it.next().?, 10) catch unreachable;
        ranges.appendAssumeCapacity(range);
    }

    if (p2) {
        std.mem.sort([2]i64, ranges.items, {}, sort);
        var highestMin: i64 = 0;
        for (0..ranges.items.len) |i| {
            res += @max(ranges.items[i][1] + 1 - @max(ranges.items[i][0], highestMin), 0);
            highestMin = @max(highestMin, ranges.items[i][1] + 1);
        }
    } else {
        var lines = std.mem.splitSequence(u8, chunks.next().?, "\n");
        while (lines.next()) |x| {
            const n = std.fmt.parseInt(i64, x, 10) catch unreachable;
            for (ranges.items) |range| {
                if (n >= range[0] and n <= range[1]) {
                    res += 1;
                    break;
                }
            }
        }
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    return solve(input, is_test, false);
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    return solve(input, is_test, true);
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
