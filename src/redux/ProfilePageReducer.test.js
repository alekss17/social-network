import ProfilePage, { addPostActionCreator, deletePost } from './ProfilePageReducer';

jest.mock('../DAL/api', () => ({
  ProfileApi: {
    GetProfile: jest.fn(),
    GetProfileStatus: jest.fn(),
    UpdateProfileStatus: jest.fn(),
    savePhoto: jest.fn(),
    saveProfile: jest.fn(),
  }
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-id')
}));

const initialState = {
  postData: [
    { id: 1, message: "Hi, how are you", likescount: 0 },
    { id: 2, message: "Hi", likescount: 0 },
    { id: 3, message: "Hohoho", likescount: 0 }
  ],
  profile: null,
  ProfileStatus: "",
  ProfileLoading: false,
  ProfileDataFormError: null
};

test('new post should be added', () => {
  const action = addPostActionCreator('it-alekss.com');
  const newState = ProfilePage(initialState, action);

  expect(newState.postData.length).toBe(4);
});

test('new text should be correct', () => {
  const action = addPostActionCreator('it-alekss.com');
  const newState = ProfilePage(initialState, action);

  const added = newState.postData[newState.postData.length - 1];
  expect(added.message).toBe('it-alekss.com');
});

test('after deleted length of messages should be decremented', () => {
  const action = deletePost(2);
  const newState = ProfilePage(initialState, action);

  expect(newState.postData.length).toBe(2);
});

test('after deleting non-existing id length should not change', () => {
  const action = deletePost(1000000);
  const newState = ProfilePage(initialState, action);

  expect(newState.postData.length).toBe(3);
});
