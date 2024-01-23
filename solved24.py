from sympy import symbols, Eq, solve

t1, t2, t3, x, y, z, vx, vy, vz = symbols('t1 t2 t3 x y z vx vy vz')

eqs = [
  Eq(194592040768564 + 160 * t1, x + vx * t1),
  Eq(332365743938486 + -81 * t1, y + vy * t1),
  Eq(196880917504399 + 182 * t1, z + vz * t1),
  Eq(119269259427296 + 320 * t2, x + vx * t2),
  Eq(151358331038299 + 350 * t2, y + vy * t2),
  Eq(32133087271013 + 804 * t2, z + vz * t2),
  Eq(137316267565914 + 252 * t3, x + vx * t3),
  Eq(280950442046082 + -89 * t3, y + vy * t3),
  Eq(163349784223749 + 298 * t3, z + vz * t3),
]

solution = solve(eqs, (t1, t2, t3, x, y, z, vx, vy, vz))

print(solution)
print(solution[0][3] + solution[0][4] + solution[0][5])