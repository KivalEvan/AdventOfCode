const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn isSymbol(c: u8) bool {
    return switch (c) {
        '*', '$', '=', '#', '%', '/', '&', '+', '-', '@' => true,
        else => false,
    };
}

fn concat(al: std.mem.Allocator, a: []const u8, b: []const u8) ![]u8 {
    const result = try al.alloc(u8, a.len + b.len);
    @memcpy(result[0..a.len], a);
    @memcpy(result[a.len..], b);
    return result;
}

fn yeetTheNumber(grid: [][]u8, x: usize, y: usize) []u8 {
    var res: []u8 = "";
    if (std.ascii.isDigit(grid[y][x])) {
        res = std.heap.c_allocator.alloc(u8, 1) catch unreachable;
        res[0] = grid[y][x];
        grid[y][x] = '.';
        if (x > 0) res =
            concat(std.heap.c_allocator, yeetTheNumber(grid, x - 1, y), res) catch unreachable;
        if (x < grid[y].len - 1) res = concat(std.heap.c_allocator, res, yeetTheNumber(grid, x + 1, y)) catch unreachable;
    }
    return res;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var raw_grid = std.ArrayList([]u8).init(std.heap.c_allocator);
    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        raw_grid.append(@constCast(line)) catch unreachable;
    }
    const grid = raw_grid.toOwnedSlice() catch unreachable;
    defer std.heap.c_allocator.free(grid);

    var res: u64 = 0;

    for (0..grid.len) |y| {
        for (0..grid.len) |x| {
            if (isSymbol(grid[y][x])) {
                if (x > 0) {
                    if (y < grid.len - 1) res += std.fmt.parseInt(u64, yeetTheNumber(grid, x - 1, y + 1), 10) catch 0;
                    if (y > 0) res += std.fmt.parseInt(u64, yeetTheNumber(grid, x - 1, y - 1), 10) catch 0;
                    res += std.fmt.parseInt(u64, yeetTheNumber(grid, x - 1, y), 10) catch 0;
                }
                if (x < grid.len - 1) {
                    if (y < grid.len - 1) res += std.fmt.parseInt(u64, yeetTheNumber(grid, x + 1, y + 1), 10) catch 0;
                    if (y > 0) res += std.fmt.parseInt(u64, yeetTheNumber(grid, x + 1, y - 1), 10) catch 0;
                    res += std.fmt.parseInt(u64, yeetTheNumber(grid, x + 1, y), 10) catch 0;
                }
                if (y > 0) res += std.fmt.parseInt(u64, yeetTheNumber(grid, x, y - 1), 10) catch 0;
                if (y < grid.len - 1) res += std.fmt.parseInt(u64, yeetTheNumber(grid, x, y + 1), 10) catch 0;
            }
        }
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var raw_grid = std.ArrayList([]u8).init(std.heap.c_allocator);
    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        raw_grid.append(@constCast(line)) catch unreachable;
    }
    const grid = raw_grid.toOwnedSlice() catch unreachable;
    defer std.heap.c_allocator.free(grid);

    var res: u64 = 0;

    for (0..grid.len) |y| {
        for (0..grid.len) |x| {
            if (grid[y][x] == '*') {
                var ary = std.ArrayList(u64).initCapacity(std.heap.c_allocator, 8) catch unreachable;
                defer ary.deinit();
                if (x > 0) {
                    if (y < grid.len - 1) ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x - 1, y + 1), 10) catch 0) catch unreachable;
                    if (y > 0) ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x - 1, y - 1), 10) catch 0) catch unreachable;
                    ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x - 1, y), 10) catch 0) catch unreachable;
                }
                if (x < grid.len - 1) {
                    if (y < grid.len - 1) ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x + 1, y + 1), 10) catch 0) catch unreachable;
                    if (y > 0) ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x + 1, y - 1), 10) catch 0) catch unreachable;
                    ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x + 1, y), 10) catch 0) catch unreachable;
                }
                if (y > 0) ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x, y - 1), 10) catch 0) catch unreachable;
                if (y < grid.len - 1) ary.append(std.fmt.parseInt(u64, yeetTheNumber(grid, x, y + 1), 10) catch 0) catch unreachable;

                var filtered = std.ArrayList(u64).init(std.heap.c_allocator);
                defer filtered.deinit();
                for (ary.items) |val| {
                    if (val != 0) filtered.append(val) catch unreachable;
                }
                if (filtered.items.len == 2) res += filtered.items[0] * filtered.items[1];
            }
        }
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
