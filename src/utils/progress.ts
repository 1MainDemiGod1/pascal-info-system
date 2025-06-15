export interface LearningProgress {
  topics: Record<string, {
    completed: boolean
    subTopicsDone: string[]
  }>
}

function getKey(userId: string) {
  return `progress_${userId}`
}

function load(userId: string): LearningProgress {
  try {
    return JSON.parse(localStorage.getItem(getKey(userId)) || '{"topics":{}}') as LearningProgress
  } catch {
    return { topics: {} }
  }
}

function save(userId: string, data: LearningProgress) {
  localStorage.setItem(getKey(userId), JSON.stringify(data))
}

export function markSubTopicDone(userId: string, topicId: string, subTopicId: string) {
  const data = load(userId)
  if (!data.topics[topicId]) data.topics[topicId] = { completed: false, subTopicsDone: [] }
  if (!data.topics[topicId].subTopicsDone.includes(subTopicId)) {
    data.topics[topicId].subTopicsDone.push(subTopicId)
  }
  save(userId, data)
}

export function markTopicCompleted(userId: string, topicId: string){
  const data = load(userId)
  if(!data.topics[topicId]) data.topics[topicId]={completed:true,subTopicsDone:[]}
  data.topics[topicId].completed=true
  save(userId, data)
}

export function isSubTopicDone(userId:string, topicId:string, subTopicId:string){
  const data=load(userId)
  return !!data.topics[topicId]?.subTopicsDone.includes(subTopicId)
}

export function getTopicProgress(userId:string, topicId:string, totalSub:number){
  const data=load(userId)
  const count=data.topics[topicId]?.subTopicsDone.length||0
  return Math.min(Math.round((count/totalSub)*100),100)
}

export function isTopicCompleted(userId:string, topicId:string){
  const data=load(userId)
  return !!data.topics[topicId]?.completed
} 