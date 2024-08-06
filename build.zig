const std = @import("std");

pub fn build(b: *std.Build) void {
    const exe = b.addExecutable(.{
        .name = "aoc_zig",
        .root_source_file = b.path(b.args.?[0]),
        .target = b.standardTargetOptions(.{}),
        .optimize = .ReleaseSafe,
    });
    const aoc = b.addModule("aoc", .{ .root_source_file = b.path("src/langs/zig/run.zig") });
    exe.root_module.addImport("aoc", aoc);

    b.installArtifact(exe);
}
