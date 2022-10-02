import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { SandboxApi } from "./AxiosService.js"

class PostsService{
  async getPosts(){
    AppState.posts = []
    const res = await SandboxApi.get('api/posts')
    logger.log(res.data, '[getPostsFromService]')
    AppState.posts = res.data.posts.map(p=> new Post(p))
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
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
     AppState.newerPage = res.data.newer
      AppState.olderPage = res.data.older
  } 
  async createPost(formData){
    const res = await SandboxApi.post('api/posts', formData)
    AppState.posts.push(new Post(res.data))
    this.getPosts()
  }
  async removePost(id){
    const res = await SandboxApi.delete(`api/posts/${id}`)
    AppState.posts = AppState.posts.filter(p=>p.id != id)
    // this.getPosts()
  }

  async likePost(id){
    const res = await SandboxApi.post(`api/posts/${id}/like`)
    AppState.likes = res.data.likes
    this.getPosts()
    
  }
  async olderPage(){
    const res = await SandboxApi.get(AppState.olderPage)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
  }
  async newerPage(){
    const res = await SandboxApi.get(AppState.newerPage)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
  }
  
   
}

export const postsService = new PostsService()