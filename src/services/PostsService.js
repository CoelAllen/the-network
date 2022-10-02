import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { SandboxApi } from "./AxiosService.js"

class PostsService{
  async getPosts(){
    AppState.posts = []
    const res = await SandboxApi.get('api/posts')
    logger.log(res.data, '[getPostsFromService]')
    AppState.posts = res.data.posts.map(p => new Post(p))
  //  TODO Split into two functions, url is really hard
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }
  async getPostsBySearchTerm(term, page=1){
    const res = await SandboxApi.get('api/posts', {
      params: {
        query: term,
        page
      }
    })
    AppState.posts = res.data.posts.map(p=> new Post(p))
    AppState.term = term
  }
  async getPostsByCreatorId(creatorId){
    AppState.posts = []
    const res = await SandboxApi.get('api/posts', {
      params: {
        creatorId
      }
    })
    AppState.posts = res.data.posts.map(p=> new Post(p))
  } 
  async createPost(formData){
    const res = await SandboxApi.post('api/posts', formData)
    AppState.posts.push(new Post(res.data))
  }
   
}

export const postsService = new PostsService()