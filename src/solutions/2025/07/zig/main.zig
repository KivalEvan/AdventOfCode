const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn solve(input: []const u8, is_test: bool, p2: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;
    const len = std.mem.indexOf(u8, input, "\n").?;
    var buffer: [141]i64 = .{0} ** 141;
    buffer[std.mem.indexOf(u8, input, "S").?] = 1;
    for (input, 0..len) |c, i| {
        const x = i % (len + 1);
        if (c != '^') {
            continue;
        }
        if (buffer[x] > 0) {
            res += 1;
        }
        buffer[x - 1] += buffer[x];
        buffer[x + 1] += buffer[x];
        buffer[x] = 0;
    }
    if (p2) {
        res = 0;
        for (buffer) |l| {
            res += l;
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
