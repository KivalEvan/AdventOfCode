const std = @import("std");
const getAllocator = @import("allocator.zig").getAllocator;

const allocator = getAllocator();

pub const Answers = struct {
    test1: []const u8,
    part1: []const u8,
    test2: []const u8,
    part2: []const u8,

    fn init() Answers {
        return .{
            .test1 = "",
            .part1 = "",
            .test2 = "",
            .part2 = "",
        };
    }

    pub fn deinit(self: Answers) void {
        allocator.free(self.test1);
        allocator.free(self.part1);
        allocator.free(self.test2);
        allocator.free(self.part2);
    }
};

pub fn getInput(path: []const u8) []const u8 {
    var file = std.fs.cwd().openFile(path, .{}) catch return "";

    defer file.close();

    const file_size = (file.stat() catch return "").size;
    const buffer = allocator.alloc(u8, file_size) catch return "";
    file.reader().readNoEof(buffer) catch return "";

    return std.mem.trimRight(u8, buffer, "\n");
}

pub fn getAnswers(path: []const u8) Answers {
    const input = getInput(path);
    defer allocator.free(input);

    var it = std.mem.splitSequence(u8, input, "\n");
    var idx: i64 = 0;

    var answers = Answers.init();
    while (it.next()) |x| {
        switch (idx) {
            0 => answers.test1 = allocator.dupe(u8, x) catch unreachable,
            1 => answers.part1 = allocator.dupe(u8, x) catch unreachable,
            2 => answers.test2 = allocator.dupe(u8, x) catch unreachable,
            3 => answers.part2 = allocator.dupe(u8, x) catch unreachable,
            else => {},
        }
        idx = idx + 1;
    }

    return answers;
}
