const std = @import("std");

pub fn getAllocator() std.mem.Allocator {
    return std.heap.page_allocator;
}
