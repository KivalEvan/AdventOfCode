const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn array_contains(comptime T: type, haystack: []T, needle: T) bool {
    for (haystack) |element|
        if (element == needle)
            return true;
    return false;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        var jackson = std.mem.splitBackwardsSequence(u8, line, ":");
        const micheal = jackson.next().?;
        var moment = std.mem.splitSequence(u8, micheal, "|");

        var winNum = std.ArrayList(i64).init(std.heap.c_allocator);
        defer winNum.deinit();
        var numIhaveIguess = std.ArrayList(i64).init(std.heap.c_allocator);
        defer numIhaveIguess.deinit();

        var xdd = std.mem.splitSequence(u8, moment.next().?, " ");
        while (xdd.next()) |xd| {
            if (xd.len == 0) continue;
            winNum.append(std.fmt.parseInt(i64, xd, 10) catch 0) catch unreachable;
        }

        var ddx = std.mem.splitSequence(u8, moment.next().?, " ");
        while (ddx.next()) |dx| {
            if (dx.len == 0) continue;
            numIhaveIguess.append(std.fmt.parseInt(i64, dx, 10) catch 0) catch unreachable;
        }

        var i: i64 = -1;
        for (winNum.items) |num| {
            if (array_contains(i64, numIhaveIguess.items, num)) {
                i += 1;
            }
        }

        res += if (i != -1) std.math.pow(i64, 2, i) else 0;
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    var lines = std.mem.splitSequence(u8, input, "\n");
    var instances = std.ArrayList(i64).init(std.heap.c_allocator);
    defer instances.deinit();
    while (lines.next()) |_| {
        instances.append(1) catch unreachable;
    }
    lines.reset();

    var idx: usize = 0;
    while (lines.next()) |line| {
        var jackson = std.mem.splitBackwardsSequence(u8, line, ":");
        const micheal = jackson.next().?;
        var moment = std.mem.splitSequence(u8, micheal, "|");

        var winNum = std.ArrayList(i64).init(std.heap.c_allocator);
        defer winNum.deinit();
        var numIhaveIguess = std.ArrayList(i64).init(std.heap.c_allocator);
        defer numIhaveIguess.deinit();

        var xdd = std.mem.splitSequence(u8, moment.next().?, " ");
        while (xdd.next()) |xd| {
            if (xd.len == 0) continue;
            winNum.append(std.fmt.parseInt(i64, xd, 10) catch 0) catch unreachable;
        }

        var ddx = std.mem.splitSequence(u8, moment.next().?, " ");
        while (ddx.next()) |dx| {
            if (dx.len == 0) continue;
            numIhaveIguess.append(std.fmt.parseInt(i64, dx, 10) catch 0) catch unreachable;
        }

        var i: usize = 0;
        for (winNum.items) |num| {
            if (array_contains(i64, numIhaveIguess.items, num)) {
                i += 1;
            }
        }

        while (i > 0) {
            instances.items[idx + i] += instances.items[idx];
            i -= 1;
        }

        idx += 1;
    }

    for (instances.items) |instance| {
        res += instance;
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
