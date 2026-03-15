function showSalary(users, age) {
  const filteredUsers = users.filter((user) => user.age <= age);

  const lines = filteredUsers.map((user) => `${user.name}, ${user.balance}`);

  return lines.join("\n");
}
