const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn gcd(a: u64, b: u64) u64 {
    if (b == 0) {
        return a;
    }
    return gcd(b, @mod(a, b));
}

fn lcm(a: u64, b: u64) u64 {
    return (a * b) / gcd(a, b);
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: u64 = 0;

    var lines = std.mem.splitSequence(u8, input, "\n");
    const l = lines.next().?;
    const instructions = std.heap.c_allocator.alloc(u1, l.len) catch unreachable;
    defer std.heap.c_allocator.free(instructions);
    for (l, 0..) |c, i| {
        instructions[i] = if (c == 'L') 0 else 1;
    }

    var maps = std.StringHashMap([2][3]u8).init(std.heap.c_allocator);
    defer maps.deinit();
    _ = lines.next().?;
    while (lines.next()) |line| {
        var temp = std.mem.splitSequence(u8, line, " = ");
        const dest = temp.next().?;
        const lr = temp.next().?;
        var str2: [2][3]u8 = undefined;
        for (0..3) |i| {
            str2[0][i] = lr[1 + i];
            str2[1][i] = lr[6 + i];
        }
        maps.put(dest, str2) catch unreachable;
    }

    var nav: [3]u8 = .{ 'A', 'A', 'A' };
    while (true) {
        const m = maps.get(&nav).?;
        nav = m[instructions[@mod(res, instructions.len)]];
        res += 1;
        if (std.mem.eql(u8, &nav, "ZZZ")) {
            break;
        }
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    var res: u64 = 1;

    var lines = std.mem.splitSequence(u8, input, "\n");
    const l = lines.next().?;
    const instructions = std.heap.c_allocator.alloc(u1, l.len) catch unreachable;
    defer std.heap.c_allocator.free(instructions);
    for (l, 0..) |c, i| {
        instructions[i] = if (c == 'L') 0 else 1;
    }

    var maps = std.StringHashMap([2][3]u8).init(std.heap.c_allocator);
    var navs = std.ArrayList([3]u8).init(std.heap.c_allocator);
    defer maps.deinit();
    defer navs.deinit();
    _ = lines.next().?;
    while (lines.next()) |line| {
        var temp = std.mem.splitSequence(u8, line, " = ");
        const dest = temp.next().?;
        const lr = temp.next().?;
        var str2: [2][3]u8 = undefined;
        for (0..3) |i| {
            str2[0][i] = lr[1 + i];
            str2[1][i] = lr[6 + i];
        }
        maps.put(dest, str2) catch unreachable;
        if (dest[2] == 'A') {
            navs.append([3]u8{ dest[0], dest[1], dest[2] }) catch unreachable;
        }
    }

    for (0..navs.items.len) |i| {
        var nav: [3]u8 = undefined;
        for (0..3) |k| {
            nav[k] = navs.items[i][k];
        }
        var j: u64 = 0;
        while (true) {
            const m = maps.get(&nav).?;
            nav = m[instructions[@mod(j, instructions.len)]];
            j += 1;
            if (nav[2] == 'Z') {
                break;
            }
        }
        res = lcm(res, j);
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
