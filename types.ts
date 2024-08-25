interface Comment {
    range: number[];
    color: string;
    comment: string;
  }
  
  interface DisplayedComment {
    username: string;
    firstName: string;
    lastName: string;
    userImage: string;
    comment: Comment;
    tag: string;
  }
  