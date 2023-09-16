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