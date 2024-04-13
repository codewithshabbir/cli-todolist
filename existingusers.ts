let existingUsers = [
  {
    userId: 1,
    username: "shabbir786",
    name: "Muhammad Shabbir",
    gender: "Male",
    password: "Shabbir123",
    myTodos: [
      {
        todoId: 1,
        todoMessage: "hi",
      },
      {
        todoId: 2,
        todoMessage: "hello",
      },
      {
        todoId: 3,
        todoMessage: "bye",
      },
    ],
  },
  {
    userId: 2,
    username: "Khadim786",
    name: "Khadim Hussain",
    gender: "Male",
    password: "khadim123",
    myTodos: [
      {
        todoId: 1,
        todoMessage: "hi",
      },
      {
        todoId: 2,
        todoMessage: "hello",
      },
      {
        todoId: 3,
        todoMessage: "bye",
      },
    ],
  },
  {
    userId: 3,
    username: "maryam786",
    name: "maryam Fatima",
    gender: "Female",
    password: "maryam123",
    myTodos: [
      {
        todoId: 1,
        todoMessage: "hi",
      },
      {
        todoId: 2,
        todoMessage: "hello",
      },
      {
        todoId: 3,
        todoMessage: "bye",
      },
    ],
  },
];

function getExistingUsers() {
  return existingUsers;
}

function addNewUser(newUser: {
  userId: number;
  username: string;
  name: string;
  gender: string;
  password: string;
  myTodos: { todoId: number; todoMessage: string }[];
}) {
  existingUsers.push(newUser);
}

export { getExistingUsers, addNewUser };
