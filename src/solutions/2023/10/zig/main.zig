const std = @import("std");
const aoc = @import("aoc");

var options = aoc.SolutionOptions.init();

fn array_contains(comptime T: type, haystack: [4]T, needle: T) bool {
    for (haystack) |element|
        if (element == needle)
            return true;
    return false;
}

fn findStart(grid: [][]const u8) [2]u64 {
    for (0..grid.len) |y| {
        for (0..grid[0].len) |x| {
            if (grid[y][x] == 'S') {
                return .{ x, y };
            }
        }
    }
    return .{ 0, 0 };
}

fn goUp(
    grid: [][]const u8,
    x: u64,
    y: u64,
) bool {
    const criteria = [4]u8{ 'S', '7', 'F', '|' };
    return y > 0 and array_contains(u8, criteria, grid[y - 1][x]);
}

fn goDown(
    grid: [][]const u8,
    x: u64,
    y: u64,
) bool {
    const criteria = [4]u8{ 'S', 'L', 'J', '|' };
    return y < grid.len - 1 and array_contains(u8, criteria, grid[y + 1][x]);
}

fn goLeft(
    grid: [][]const u8,
    x: u64,
    y: u64,
) bool {
    const criteria = [4]u8{ 'S', 'L', 'F', '-' };
    return x > 0 and array_contains(u8, criteria, grid[y][x - 1]);
}

fn goRight(
    grid: [][]const u8,
    x: u64,
    y: u64,
) bool {
    const criteria = [4]u8{ 'S', '7', 'J', '-' };
    return x < grid[y].len - 1 and array_contains(u8, criteria, grid[y][x + 1]);
}

fn lookUp(
    grid: [][]const u8,
    x: u64,
    y: u64,
) [][2]u64 {
    const c = grid[y][x];
    var res = std.ArrayList([2]u64).init(std.heap.c_allocator);
    if (c == '|') {
        if (goUp(grid, x, y)) {
            res.append(.{ x, y - 1 }) catch unreachable;
        }
        if (goDown(grid, x, y)) {
            res.append(.{ x, y + 1 }) catch unreachable;
        }
    }
    if (c == '-') {
        if (goLeft(grid, x, y)) {
            res.append(.{ x - 1, y }) catch unreachable;
        }
        if (goRight(grid, x, y)) {
            res.append(.{ x + 1, y }) catch unreachable;
        }
    }
    if (c == 'L') {
        if (goUp(grid, x, y)) {
            res.append(.{ x, y - 1 }) catch unreachable;
        }
        if (goRight(grid, x, y)) {
            res.append(.{ x + 1, y }) catch unreachable;
        }
    }
    if (c == 'J') {
        if (goUp(grid, x, y)) {
            res.append(.{ x, y - 1 }) catch unreachable;
        }
        if (goLeft(grid, x, y)) {
            res.append(.{ x - 1, y }) catch unreachable;
        }
    }
    if (c == '7') {
        if (goDown(grid, x, y)) {
            res.append(.{ x, y + 1 }) catch unreachable;
        }
        if (goLeft(grid, x, y)) {
            res.append(.{ x - 1, y }) catch unreachable;
        }
    }
    if (c == 'F') {
        if (goDown(grid, x, y)) {
            res.append(.{ x, y + 1 }) catch unreachable;
        }
        if (goRight(grid, x, y)) {
            res.append(.{ x + 1, y }) catch unreachable;
        }
    }
    if (c == 'S') {
        if (goUp(grid, x, y)) {
            res.append(.{ x, y - 1 }) catch unreachable;
        }
        if (goDown(grid, x, y)) {
            res.append(.{ x, y + 1 }) catch unreachable;
        }
        if (goLeft(grid, x, y)) {
            res.append(.{ x - 1, y }) catch unreachable;
        }
        if (goRight(grid, x, y)) {
            res.append(.{ x + 1, y }) catch unreachable;
        }
    }
    return res.toOwnedSlice() catch unreachable;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: u64 = 0;
    var lines = std.mem.splitSequence(u8, input, "\n");
    var i: usize = 0;
    while (lines.next()) |_| {
        i += 1;
    }
    lines.reset();
    const grid: [][]const u8 = std.heap.c_allocator.alloc([]u8, i) catch unreachable;
    var visited: [][]bool = std.heap.c_allocator.alloc([]bool, i) catch unreachable;
    defer std.heap.c_allocator.free(grid);
    defer std.heap.c_allocator.free(visited);
    i = 0;
    while (lines.next()) |line| {
        grid[i] = line;
        visited[i] = std.heap.c_allocator.alloc(bool, line.len) catch unreachable;
        for (0..line.len) |j| {
            visited[i][j] = false;
        }
        i += 1;
    }

    var queue = std.ArrayList([2]u64).init(std.heap.c_allocator);
    queue.append(findStart(grid)) catch unreachable;
    defer queue.deinit();
    while (queue.items.len > 0) {
        const current = queue.pop();
        const found = lookUp(grid, current[0], current[1]);
        for (found) |f| {
            if (visited[f[1]][f[0]]) continue;
            visited[f[1]][f[0]] = true;
            queue.append(f) catch unreachable;
            res += 1;
        }
    }

    res = res / 2;
    for (visited) |visit| {
        defer std.heap.c_allocator.free(visit);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: u64 = 0;
    var lines = std.mem.splitSequence(u8, input, "\n");
    var i: usize = 0;
    while (lines.next()) |_| {
        i += 1;
    }
    lines.reset();
    const grid: [][]const u8 = std.heap.c_allocator.alloc([]u8, i) catch unreachable;
    var visited: [][]bool = std.heap.c_allocator.alloc([]bool, i * 3) catch unreachable;
    defer std.heap.c_allocator.free(grid);
    defer std.heap.c_allocator.free(visited);
    i = 0;
    while (lines.next()) |line| {
        grid[i] = line;
        i += 1;
    }
    for (0..visited.len) |j| {
        visited[j] = std.heap.c_allocator.alloc(bool, grid[0].len * 3) catch unreachable;
        for (0..visited[j].len) |k| {
            visited[j][k] = false;
        }
    }

    var queue = std.ArrayList([2]u64).init(std.heap.c_allocator);
    queue.append(findStart(grid)) catch unreachable;
    defer queue.deinit();
    while (queue.items.len > 0) {
        const current = queue.pop();
        const found = lookUp(grid, current[0], current[1]);
        for (found) |f| {
            visited[f[1] * 3 + 1 + current[1] - f[1]][f[0] * 3 + 1 + current[0] - f[0]] = true;
            if (visited[f[1] * 3 + 1][f[0] * 3 + 1]) {
                continue;
            }
            visited[f[1] * 3 + 1][f[0] * 3 + 1] = true;
            queue.append(f) catch unreachable;
        }
    }

    queue.append(.{ 0, 0 }) catch unreachable;
    while (queue.items.len > 0) {
        const current = queue.pop();
        if (visited[current[1]][current[0]]) {
            continue;
        }
        visited[current[1]][current[0]] = true;
        for ([3]i64{ -1, 0, 1 }) |ud| {
            for ([3]i64{ -1, 0, 1 }) |lr| {
                const next_x = @as(i64, @intCast(current[0])) + lr;
                const next_y = @as(i64, @intCast(current[1])) + ud;
                if (next_y < 0 or next_y >= visited.len) {
                    continue;
                }
                if (next_x < 0 or next_x >= visited[0].len) {
                    continue;
                }
                if (visited[@as(u64, @intCast(next_y))][@as(u64, @intCast(next_x))]) {
                    continue;
                }
                queue.append(.{ @as(u64, @intCast(next_x)), @as(u64, @intCast(next_y)) }) catch unreachable;
            }
        }
    }

    for (0..grid.len) |y| {
        for (0..grid[0].len) |x| {
            if (!visited[1 + y * 3][1 + x * 3]) res += 1;
        }
    }
    for (visited) |visit| {
        defer std.heap.c_allocator.free(visit);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    options.has_alternate = true;
    try aoc.run(part1, part2, options);
}
