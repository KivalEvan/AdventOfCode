const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn solve(input: []const u8, is_test: bool, p2: bool) []const u8 {
    _ = is_test;
    var dial: i32 = 50;
    var zero: i32 = 0;

    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        const newDial = dial + (std.fmt.parseInt(i32, line[1..], 10) catch 0) * @as(i32, if (line[0] == 'R') 1 else -1);

        if (p2) {
            zero += @divFloor(if (newDial < 0) newDial * -1 else newDial, 100) + @as(i32, if (dial != 0 and newDial <= 0) 1 else 0);
            dial = @mod(newDial, 100);
        } else {
            dial = newDial;
            if (@mod(dial, 100) == 0) {
                zero += 1;
            }
        }
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{zero}) catch "";
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
