const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    return input;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    return input;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
