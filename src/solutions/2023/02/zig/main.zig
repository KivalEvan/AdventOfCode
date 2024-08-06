const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

const pogcube = struct { value: u64, color: u8 };

fn parseInput(input: []const u8) [][]pogcube {
    var lines = std.mem.splitSequence(u8, input, "\n");
    var results = std.ArrayList([]pogcube).init(std.heap.page_allocator);
    while (lines.next()) |line| {
        var x = std.mem.splitBackwardsSequence(u8, line, ":");
        const l = x.next().?;
        const m = std.mem.replaceOwned(u8, std.heap.page_allocator, l, ",", ";") catch "";
        var poggy = std.mem.splitSequence(u8, m, ";");
        var cubes = std.ArrayList(pogcube).init(std.heap.page_allocator);
        while (poggy.next()) |poggo| {
            const why = std.mem.trim(u8, poggo, " ");
            var pog = std.mem.splitSequence(u8, why, " ");
            const val = std.fmt.parseInt(u64, pog.next().?, 10) catch unreachable;
            const col = @as(u8, @mod(pog.next().?[0], 3));
            cubes.append(.{ .value = val, .color = col }) catch unreachable;
        }
        results.append(cubes.toOwnedSlice() catch unreachable) catch unreachable;
    }

    return results.toOwnedSlice() catch unreachable;
}

const rgb_p1: [3]u64 = .{ 12, 13, 14 };
fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    const parsed = parseInput(input);
    defer std.heap.page_allocator.free(parsed);
    var res: u64 = 0;

    for (parsed, 0..) |cubes, i| {
        defer std.heap.page_allocator.free(cubes);
        var found = false;
        for (cubes) |cube| {
            if (cube.value > rgb_p1[cube.color]) {
                found = true;
                break;
            }
        }
        if (!found) {
            res = res + i + 1;
        }
    }

    const buf = std.heap.page_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    const parsed = parseInput(input);
    defer std.heap.page_allocator.free(parsed);
    var res: u64 = 0;

    for (parsed) |cubes| {
        defer std.heap.page_allocator.free(cubes);
        var rgb: [3]u64 = .{ 0, 0, 0 };
        for (cubes) |cube| {
            if (cube.value > rgb[cube.color]) {
                rgb[cube.color] = cube.value;
            }
        }
        res = res + rgb[0] * rgb[1] * rgb[2];
    }

    const buf = std.heap.page_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
