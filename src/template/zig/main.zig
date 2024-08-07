const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
