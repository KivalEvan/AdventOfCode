const std = @import("std");
const aoc = @import("aoc");

var options = aoc.SolutionOptions.init();

fn getNum(str: []const u8) u8 {
    if (std.mem.startsWith(u8, str, "zero"))
        return '0';
    if (std.mem.startsWith(u8, str, "one"))
        return '1';
    if (std.mem.startsWith(u8, str, "two"))
        return '2';
    if (std.mem.startsWith(u8, str, "three"))
        return '3';
    if (std.mem.startsWith(u8, str, "four"))
        return '4';
    if (std.mem.startsWith(u8, str, "five"))
        return '5';
    if (std.mem.startsWith(u8, str, "six"))
        return '6';
    if (std.mem.startsWith(u8, str, "seven"))
        return '7';
    if (std.mem.startsWith(u8, str, "eight"))
        return '8';
    if (std.mem.startsWith(u8, str, "nine"))
        return '9';
    return ' ';
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: u32 = 0;
    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        var s: [2]u8 = .{ 0, 0 };
        for (line) |value| {
            if (std.ascii.isDigit(value)) {
                s[0] = value;
                break;
            }
        }
        for (line, 0..) |v, i| {
            _ = v;
            const value = line[line.len - i - 1];
            if (std.ascii.isDigit(value)) {
                s[1] = value;
                break;
            }
        }

        res = res + (std.fmt.parseUnsigned(u32, &s, 10) catch 0);
    }

    const buf = std.heap.page_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: u32 = 0;
    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        var s: [2]u8 = .{ 0, 0 };
        for (line, 0..) |value, i| {
            if (std.ascii.isDigit(value)) {
                s[0] = value;
                break;
            }
            const st = getNum(line[i..]);
            if (st != ' ') {
                s[0] = st;
                break;
            }
        }
        for (line, 0..) |v, i| {
            _ = v;
            const value = line[line.len - i - 1];
            if (std.ascii.isDigit(value)) {
                s[1] = value;
                break;
            }
            const st = getNum(line[(line.len - i - 1)..]);
            if (st != ' ') {
                s[1] = st;
                break;
            }
        }

        res = res + (std.fmt.parseUnsigned(u32, &s, 10) catch 0);
    }

    const buf = std.heap.page_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    options.has_alternate = true;
    try aoc.run(part1, part2, options);
}
