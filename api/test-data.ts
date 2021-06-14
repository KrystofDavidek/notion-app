export const createUser = () => {
  return {
    username: "Anonymous",
    created_at: Date.now(),
    modified_at: null,
    deleted_at: null,
  };
};

export const createPage = (title = "Page", userId = null, iconPath = null) => {
  return {
    title: title,
    user_id: userId,
    modified_info_id: 10,
    icon_path: iconPath,
    created_at: Date.now(),
    modified_at: null,
    deleted_at: null,
  };
};
