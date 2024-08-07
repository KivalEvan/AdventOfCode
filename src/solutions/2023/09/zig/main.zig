const std = @import("std");
const aoc = @import("aoc");

var options = aoc.SolutionOptions.init();

fn difference(ary: []i64, sz: usize) []i64 {
    for (0..sz) |i| ary[i] = ary[i + 1] - ary[i];
    return ary;
}

fn extrapolate(ary: []i64, sz: usize) i64 {
    const idx = sz - 1;
    const last = ary[idx];
    if (idx == 0) return last;
    return extrapolate(difference(ary, idx), idx) + last;
}

fn parseInput(input: []const u8) [][]i64 {
    var lines = std.mem.splitSequence(u8, input, "\n");

    var ary = std.ArrayList([]i64).init(std.heap.c_allocator);
    while (lines.next()) |line| {
        var numstr = std.mem.splitSequence(u8, line, " ");
        var nums = std.ArrayList(i64).init(std.heap.c_allocator);
        while (numstr.next()) |ns| {
            nums.append(std.fmt.parseInt(i64, ns, 10) catch unreachable) catch unreachable;
        }

        ary.append(nums.toOwnedSlice() catch unreachable) catch unreachable;
    }
    return ary.toOwnedSlice() catch unreachable;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;
    const histories = parseInput(input);
    defer std.heap.c_allocator.free(histories);
    for (histories) |history| {
        res = res + extrapolate(history, history.len);
        defer std.heap.c_allocator.free(history);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;
    const histories = parseInput(input);
    defer std.heap.c_allocator.free(histories);
    for (histories) |history| {
        std.mem.reverse(i64, history);
        res = res + extrapolate(history, history.len);
        defer std.heap.c_allocator.free(history);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
