const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn solve(input: []const u8, is_test: bool, p2: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        var start: usize = 0;
        const max: usize = if (p2) 12 else 2;

        for (0..max) |digit| {
            var marked: usize = 0;
            var n: i64 = 0;
            const t = max - 1 - digit;
            const l = line.len - t;
            for (start..l) |it| {
                const parsed = line[it] - '0';
                if (n < parsed) {
                    marked = it;
                    n = parsed;
                }
            }

            start = marked + 1;
            res += n * std.math.pow(i64, 10, @intCast(t));
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
