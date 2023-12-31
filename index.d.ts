export interface CommentThreadListResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: CommentThread[];
  }
  
export interface CommentThread {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      channelId: string;
      videoId: string;
      topLevelComment: {
        kind: string;
        etag: string;
        id: string;
        snippet: {
          channelId: string;
          videoId: string;
          textDisplay: string;
          textOriginal: string;
          authorDisplayName: string;
          authorProfileImageUrl: string;
          authorChannelUrl: string;
          authorChannelId: {
            value: string;
          };
          canRate: boolean;
          viewerRating: string;
          likeCount: number;
          moderationStatus: string;
          publishedAt: string;
          updatedAt: string;
        };
      };
      canReply: boolean;
      totalReplyCount: number;
      isPublic: boolean;
    };
  }


  export interface Root {
    kind: string
    etag: string
    nextPageToken: string
    pageInfo: PageInfo
    items: Item[]
  }
  
  export interface PageInfo {
    totalResults: number
    resultsPerPage: number
  }
  
  export interface Item {
    kind: string
    etag: string
    id: string
    snippet: Snippet
  }
  
  export interface Snippet {
    channelId: string
    videoId: string
    topLevelComment: TopLevelComment
    canReply: boolean
    totalReplyCount: number
    isPublic: boolean
  }
  
  export interface TopLevelComment {
    kind: string
    etag: string
    id: string
    snippet: Snippet2
  }
  
  export interface Snippet2 {
    channelId: string
    videoId: string
    textDisplay: string
    textOriginal: string
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: AuthorChannelId
    canRate: boolean
    viewerRating: string
    likeCount: number
    moderationStatus?: string
    publishedAt: string
    updatedAt: string
  }
  
  export interface AuthorChannelId {
    value: string
  }
