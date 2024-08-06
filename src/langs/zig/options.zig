pub const SolutionOptions = struct {
    has_alternate: bool,
    has_io: bool,

    pub fn init() SolutionOptions {
        return .{
            .has_alternate = false,
            .has_io = false,
        };
    }
};
