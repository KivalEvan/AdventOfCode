const std = @import("std");
const aoc = @import("aoc");

const options = aoc.SolutionOptions.init();

fn getRanking(c: u8) u8 {
    return switch (c) {
        'A' => 13,
        'K' => 12,
        'Q' => 11,
        'J' => 10,
        'T' => 9,
        '9' => 8,
        '8' => 7,
        '7' => 6,
        '6' => 5,
        '5' => 4,
        '4' => 3,
        '3' => 2,
        '2' => 1,
        else => 0,
    };
}

const Deck = enum(u8) {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
};

const HandPair = struct {
    card: [5]u8,
    value: i64,
};

fn getType(cards: [5]u8) u8 {
    var values: [14]u8 = .{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    for (0..5) |i| {
        values[getRanking(cards[i])] += 1;
    }

    if (values[0] > 0) {
        const temp = values[0];
        values[0] = 0;
        var max: u8 = 0;
        var idx: usize = 0;
        for (0..14) |i| {
            if (values[i] > max) {
                max = values[i];
                idx = i;
            }
        }
        values[idx] += temp;
    }

    var new_values = std.ArrayList(u8).init(std.heap.c_allocator);
    defer new_values.deinit();
    for (values) |v| {
        if (v != 0) new_values.append(v) catch unreachable;
    }

    if (new_values.items.len == 1)
        return @intFromEnum(Deck.FiveOfAKind);
    if (new_values.items.len == 4) return @intFromEnum(Deck.OnePair);
    if (new_values.items.len == 5) return @intFromEnum(Deck.HighCard);

    var mn: u8 = 5;
    var mx: u8 = 0;

    for (new_values.items) |v| {
        if (mn > v) mn = v;
        if (mx < v) mx = v;
    }

    if (mn == 1) {
        if (mx == 2) return @intFromEnum(Deck.TwoPair);
        if (mx == 3) return @intFromEnum(Deck.ThreeOfAKind);
        if (mx == 4) return @intFromEnum(Deck.FourOfAKind);
    }
    return @intFromEnum(Deck.FullHouse);
}

fn parseInput(input: []const u8, joker: bool) [7]std.ArrayList(HandPair) {
    var groups: [7]std.ArrayList(HandPair) = undefined;
    for (0..7) |i| {
        groups[i] = std.ArrayList(HandPair).init(std.heap.c_allocator);
    }
    var lines = std.mem.splitSequence(u8, input, "\n");
    while (lines.next()) |line| {
        var temp = std.mem.splitSequence(u8, line, " ");
        var handPair: HandPair = undefined;
        const read = temp.next().?;
        for (0..5) |i| {
            handPair.card[i] = read[i];
            if (joker and handPair.card[i] == 'J') {
                handPair.card[i] = '1';
            }
        }
        handPair.value = std.fmt.parseInt(i64, temp.next().?, 10) catch unreachable;
        const t = getType(handPair.card);
        groups[t].append(handPair) catch unreachable;
    }

    return groups;
}

fn sortCard(_: void, a: HandPair, b: HandPair) bool {
    for (0..5) |i| {
        if (a.card[i] != b.card[i]) {
            return getRanking(a.card[i]) < getRanking(b.card[i]);
        }
    }
    return false;
}

fn solve(input: []const u8, joker: bool) []const u8 {
    const groups: [7]std.ArrayList(HandPair) = parseInput(input, joker);
    var res: i64 = 0;
    var i: i64 = 1;
    for (0..7) |j| {
        defer groups[j].deinit();
        const g: []HandPair = groups[j].items;
        std.mem.sort(HandPair, g, {}, sortCard);
        for (g) |pair| {
            res += pair.value * i;
            i += 1;
        }
    }

    const buf = std.heap.c_allocator.alloc(u8, 42) catch unreachable;
    const str = std.fmt.bufPrint(buf, "{}", .{res}) catch "";
    return str;
}

fn part1(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    return solve(input, false);
}

fn part2(input: []const u8, is_test: bool) []const u8 {
    _ = is_test;
    return solve(input, true);
}

pub fn main() !void {
    try aoc.run(part1, part2, options);
}
