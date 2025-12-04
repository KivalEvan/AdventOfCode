const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn countNeighbour(x: usize, y: usize, max: usize, input: []const u8) usize {
    var adjacent: usize = 0;
    var nX: i64 = -1;
    while (nX <= 1) : (nX += 1) {
        var nY: i64 = -1;
        while (nY <= 1) : (nY += 1) {
            const pX = @as(i64, @intCast(x)) + nX;
            const pY = @as(i64, @intCast(y)) + nY;
            const index = @as(i64, @intCast(max)) * pY + pX + pY;
            if (index < 0 or index >= input.len) continue;
            if (input[@as(usize, @intCast(index))] == '@') adjacent += 1;
        }
    }

    return adjacent - 1;
}

fn updateNeighbour(x: usize, y: usize, max: usize, grid: []usize, candidates: *std.ArrayList([2]usize)) void {
    var nX: i64 = -1;
    while (nX <= 1) : (nX += 1) {
        var nY: i64 = -1;
        while (nY <= 1) : (nY += 1) {
            const pX = @as(i64, @intCast(x)) + nX;
            const pY = @as(i64, @intCast(y)) + nY;
            const index = @as(i64, @intCast(max)) * pY + pX + pY;
            if (index < 0 or index >= grid.len) continue;
            grid[@as(usize, @intCast(index))] -|= 1;
            if (grid[@as(usize, @intCast(index))] == 3) {
                candidates.appendAssumeCapacity(.{ @as(usize, @intCast(pX)), @as(usize, @intCast(pY)) });
            }
        }
    }
}

fn solve(input: []const u8, is_test: bool, p2: bool) []const u8 {
    _ = is_test;
    var res: i64 = 0;

    const allocator = std.heap.c_allocator;
    var grid = allocator.alloc(usize, input.len) catch unreachable;
    defer allocator.free(grid);

    const max: usize = std.mem.indexOfPos(u8, input, 0, "\n") orelse 0;
    const buffer = allocator.alloc([2]usize, max * max) catch unreachable;
    defer allocator.free(buffer);
    var candidates = std.ArrayList([2]usize).initBuffer(buffer);
    for (0..max) |y| {
        for (0..max) |x| {
            const index = max * y + x + y;
            if (input[index] == '@') {
                grid[index] = countNeighbour(x, y, max, input);
                if (grid[index] < 4) {
                    candidates.appendAssumeCapacity(.{ x, y });
                }
            }
        }
    }

    while (candidates.items.len > 0) {
        const p = candidates.pop().?;
        grid[max * p[1] + p[0] + p[1]] = 0;
        res += 1;
        if (p2) updateNeighbour(p[0], p[1], max, grid, &candidates);
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
