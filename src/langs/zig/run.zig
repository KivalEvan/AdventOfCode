const std = @import("std");
pub const SolutionOptions = @import("options.zig").SolutionOptions;
const input = @import("input.zig");
const getAllocator = @import("allocator.zig").getAllocator;

const allocator = getAllocator();
const stdout = std.io.getStdOut().writer();

const SolutionWrapper = struct {
    tag: []const u8,
    func: *const fn (
        input: []const u8,
        is_test: bool,
    ) []const u8,
    path: []const u8,
    test_str: []const u8,
    iteration: usize,
    options: SolutionOptions,
    result: []const u8,
    elapsed: [2]i128,
    bench: [3][3]i128,

    pub fn init(
        comptime tag: []const u8,
        comptime func: fn (
            input: []const u8,
            is_test: bool,
        ) []const u8,
        path: []const u8,
        test_str: []const u8,
        iteration: usize,
        options: SolutionOptions,
    ) !*SolutionWrapper {
        var result = try allocator.create(SolutionWrapper);
        result.tag = tag;
        result.func = func;
        result.path = path;
        result.test_str = test_str;
        result.iteration = iteration;
        result.options = options;
        result.result = "";
        result.elapsed = .{ 0, 0 };
        result.bench = .{ .{ 0, 0, 0 }, .{ 0, 0, 0 }, .{ 0, 0, 0 } };
        return result;
    }
};

const TestError = error{Cringed};
fn testString(actual: []const u8, expected: []const u8) TestError!void {
    if (std.mem.eql(u8, expected, "")) {
        return;
    }
    if (!std.mem.eql(u8, actual, expected)) {
        std.log.err("Expected {s} but got {s}", .{ expected, actual });
        return TestError.Cringed;
    }
}

fn printResult(solution: *SolutionWrapper) !*SolutionWrapper {
    if (solution.iteration == 1) {
        try stdout.print("\n{s}: (ms) IO > Part > Overall\n", .{solution.tag});
        try stdout.print(
            "Timer: {d:.3} > {d:.3} > {d:.3}\n",
            .{
                @as(f64, @floatFromInt(solution.bench[0][2])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[1][2])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[2][2])) / 1_000_000.0,
            },
        );
    } else {
        try stdout.print("\n{s}: (ms) min..max avg\n", .{solution.tag});
        try stdout.print(
            "IO: {d:.3} .. {d:.3} - {d:.3}\n",
            .{
                @as(f64, @floatFromInt(solution.bench[0][0])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[0][1])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[0][2])) / @as(f64, @floatFromInt(solution.iteration)) / 1_000_000.0,
            },
        );
        try stdout.print(
            "Part: {d:.3} .. {d:.3} - {d:.3}\n",
            .{
                @as(f64, @floatFromInt(solution.bench[1][0])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[1][1])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[1][2])) / @as(f64, @floatFromInt(solution.iteration)) / 1_000_000.0,
            },
        );
        try stdout.print(
            "Overall: {d:.3} .. {d:.3} - {d:.3}\n",
            .{
                @as(f64, @floatFromInt(solution.bench[2][0])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[2][1])) / 1_000_000.0,
                @as(f64, @floatFromInt(solution.bench[2][2])) / @as(f64, @floatFromInt(solution.iteration)) / 1_000_000.0,
            },
        );
    }
    try stdout.print("Result: {s}\n", .{solution.result});

    return solution;
}

fn execute(solution: *SolutionWrapper) !*SolutionWrapper {
    const is_test = std.mem.startsWith(u8, solution.tag, "Test");

    var elapsed_start = std.time.nanoTimestamp();
    const inp = if (solution.options.has_io)
        solution.path
    else
        input.getInput(solution.path);
    defer allocator.free(inp);
    const elapsed_io = std.time.nanoTimestamp() - elapsed_start;

    elapsed_start = std.time.nanoTimestamp();
    const result = solution.func(inp, is_test);
    const elapsed_part = std.time.nanoTimestamp() - elapsed_start;

    solution.elapsed[0] = elapsed_io;
    solution.elapsed[1] = elapsed_part;
    solution.result = result;

    return solution;
}

fn perform(solution: *SolutionWrapper) !*SolutionWrapper {
    var times_io = try allocator.alloc(i128, solution.iteration);
    var times_part = try allocator.alloc(i128, solution.iteration);
    var times_overall = try allocator.alloc(i128, solution.iteration);

    for (0..solution.iteration) |i| {
        _ = try execute(solution);
        times_io[i] = solution.elapsed[0];
        times_part[i] = solution.elapsed[1];
        times_overall[i] = solution.elapsed[0] + solution.elapsed[1];
        if (i != solution.iteration - 1) {
            allocator.free(solution.result);
        }
    }

    var min: i128 = std.math.maxInt(i128);
    var max: i128 = std.math.minInt(i128);
    var total: i128 = 0;
    for (times_io) |v| {
        if (min > v) min = v;
        if (max < v) max = v;
        total = total + v;
    }
    solution.bench[0][0] = min;
    solution.bench[0][1] = max;
    solution.bench[0][2] = total;

    min = std.math.maxInt(i128);
    max = std.math.minInt(i128);
    total = 0;
    for (times_part) |v| {
        if (min > v) min = v;
        if (max < v) max = v;
        total = total + v;
    }
    solution.bench[1][0] = min;
    solution.bench[1][1] = max;
    solution.bench[1][2] = total;

    min = std.math.maxInt(i128);
    max = std.math.minInt(i128);
    total = 0;
    for (times_overall) |v| {
        if (min > v) min = v;
        if (max < v) max = v;
        total = total + v;
    }
    solution.bench[2][0] = min;
    solution.bench[2][1] = max;
    solution.bench[2][2] = total;

    return solution;
}

fn concat(al: std.mem.Allocator, a: []const u8, b: []const u8) ![]u8 {
    const result = try al.alloc(u8, a.len + b.len);
    @memcpy(result[0..a.len], a);
    @memcpy(result[a.len..], b);
    return result;
}

pub fn run(
    comptime fn_part1: fn (
        input: []const u8,
        is_test: bool,
    ) []const u8,
    comptime fn_part2: fn (
        input: []const u8,
        is_test: bool,
    ) []const u8,
    options: SolutionOptions,
) !void {
    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);
    if (args.len < 2) {
        return;
    }
    const path_answers = try concat(allocator, args[1], "/answers.txt");
    defer allocator.free(path_answers);
    const path_input_test_1 = try concat(allocator, args[1], "/test1.txt");
    defer allocator.free(path_input_test_1);
    const path_input_test_2 = if (options.has_alternate) try concat(allocator, args[1], "/test2.txt") else try allocator.dupe(u8, path_input_test_1);
    defer allocator.free(path_input_test_2);
    const path_input_main = try concat(allocator, args[1], "/input.txt");
    defer allocator.free(path_input_main);
    const iteration = if (args.len >= 3) std.fmt.parseInt(usize, args[2], 10) catch 1 else 1;

    const answers = input.getAnswers(path_answers);
    defer answers.deinit();
    var solutions: [4]*SolutionWrapper = undefined;
    solutions[0] = try SolutionWrapper.init("Test 1", fn_part1, path_input_test_1, answers.test1, iteration, options);
    solutions[1] = try SolutionWrapper.init("Part 1", fn_part1, path_input_main, answers.part1, iteration, options);
    solutions[2] = try SolutionWrapper.init("Test 2", fn_part2, path_input_test_2, answers.test2, iteration, options);
    solutions[3] = try SolutionWrapper.init("Part 2", fn_part2, path_input_main, answers.part2, iteration, options);

    for (solutions) |solution| {
        _ = try perform(solution);
    }

    for (solutions) |solution| {
        _ = try printResult(solution);
        _ = try testString(solution.result, solution.test_str);
    }
}
