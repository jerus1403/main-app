class Post {
  constructor(
    postId,
    userId,
    categoryList,
    imageList,
    title,
    description,
    location,
    rate
  ) {
    this.postId = postId;
    this.userId = userId;
    this.categoryList = categoryList;
    this.imageList = imageList;
    this.title = title;
    this.description = description;
    this.location = location;
    this.rate = rate;
  }
}

export default Post;
