import { doc, getDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Test, TestResult } from '../types/index'

export async function getTest(id: string): Promise<Test> {
  const testDoc = await getDoc(doc(db, 'tests', id))
  if (!testDoc.exists()) {
    throw new Error('Тест не найден')
  }
  return testDoc.data() as Test
}

export async function saveTestResult(testResult: Omit<TestResult, 'id'>): Promise<void> {
  await addDoc(collection(db, 'testResults'), testResult)
}

export async function getUserTestResults(userId: string): Promise<TestResult[]> {
  // TODO: Implement getting user test results
  return []
} 