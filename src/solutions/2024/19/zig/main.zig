const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn recurse(design: []const u8, patterns: []const u8, memo: *std.StringHashMap(u64)) u64 {
    if (memo.contains(design)) {
        return memo.get(design).?;
    }

    if (design.len == 0) {
        return 1;
    }

    var total: u64 = 0;

    var it = std.mem.splitSequence(u8, patterns, ", ");
    while (it.next()) |pattern| {
        if (std.mem.startsWith(u8, design, pattern)) {
            total += recurse(design[pattern.len..], patterns, memo);
        }
    }

    memo.put(design, total) catch unreachable;
    return total;
}

fn solve(input: []const u8, p2: bool, is_test: bool) []const u8 {
    _ = is_test;
    var lines = std.mem.splitSequence(u8, input, "\n\n");
    const patterns = lines.next().?;

    var memo = std.StringHashMap(u64).init(std.heap.c_allocator);
    defer memo.deinit();
    var total: u64 = 0;
    var designIt = std.mem.splitSequence(u8, lines.next().?, "\n");
    while (designIt.next()) |design| {
        const combinations = recurse(design, patterns, &memo);
        total += if (p2) combinations else if (combinations > 0) 1 else 0;
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{total}) catch "";
    return str;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    return solve(input, false, is_test);
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    return solve(input, true, is_test);
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
