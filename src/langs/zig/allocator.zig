const std = @import("std");

pub fn getAllocator() std.mem.Allocator {
    return std.heap.c_allocator;
}
