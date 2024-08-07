const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn ohnomath(b: f64, c: f64) i64 {
    const pepsilon = 0.001;
    const min = @as(i64, @intFromFloat(std.math.floor((b + std.math.sqrt(@abs(b * b - 4.0 * c))) / 2.0 - pepsilon)));
    const max = @as(i64, @intFromFloat(std.math.ceil((b - std.math.sqrt(@abs(b * b - 4.0 * c))) / 2.0 + pepsilon)));
    return min - max + 1;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var t = std.ArrayList(f64).init(std.heap.c_allocator);
    defer t.deinit();
    var d = std.ArrayList(f64).init(std.heap.c_allocator);
    defer d.deinit();
    var res: i64 = 1;

    var lines = std.mem.splitSequence(u8, input, "\n");
    var iterator = std.mem.splitBackwardsSequence(u8, lines.next().?, ":");
    var scores = std.mem.splitSequence(u8, iterator.next().?, " ");
    while (scores.next()) |score| {
        if (score.len == 0) continue;
        t.append(std.fmt.parseFloat(f64, score) catch unreachable) catch unreachable;
    }
    iterator = std.mem.splitBackwardsSequence(u8, lines.next().?, ":");
    scores = std.mem.splitSequence(u8, iterator.next().?, " ");
    while (scores.next()) |score| {
        if (score.len == 0) continue;
        d.append(std.fmt.parseFloat(f64, score) catch unreachable) catch unreachable;
    }

    for (0..t.items.len) |i| {
        res *= ohnomath(t.items[i], d.items[i]);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var lines = std.mem.splitSequence(u8, input, "\n");
    var iterator = std.mem.splitBackwardsSequence(u8, lines.next().?, ":");
    const t_score = std.mem.replaceOwned(u8, std.heap.c_allocator, iterator.next().?, " ", "") catch unreachable;
    defer std.heap.c_allocator.free(t_score);
    const t = std.fmt.parseFloat(f64, t_score) catch unreachable;

    iterator = std.mem.splitBackwardsSequence(u8, lines.next().?, ":");
    const d_score = std.mem.replaceOwned(u8, std.heap.c_allocator, iterator.next().?, " ", "") catch unreachable;
    defer std.heap.c_allocator.free(d_score);
    const d = std.fmt.parseFloat(f64, d_score) catch unreachable;

    const res = ohnomath(t, d);

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
