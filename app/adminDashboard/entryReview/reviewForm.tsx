"use client"
import React, { useState } from "react"
import updatePythonReview from "./updatePythonReview"
import updateTypeScriptReview from "./updateTypeScriptReview"
import Messages from "@/app/login/messages"
import { Alert, Button, Option, Select } from "@/ui"

type TReviewOption = {
  value: string
  label: string
}

const ReviewOptions: TReviewOption[] = [
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "Average", label: "Average" },
  { value: "Poor", label: "Poor" }
]

function ReviewForm({ employeeLists = [{}] }: any) {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [pythonReview, setPythonReview] = useState("")
  const [typescriptReview, setTypescriptReview] = useState("")

  const [showFeedback, setShowFeedback] = React.useState(false)
  const [feedback, setFeedback] = useState<{
    isSucces: boolean
    msg: string
  }>({ isSucces: false, msg: "" })

  const setFeedbackMessage = (isSucces: boolean, msg: string) => {
    setFeedback({ isSucces, msg })
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
    }, 3000)
  }

  const handleUserChange = (userId: any) => {
    const selectedUserTemp = employeeLists.find(
      (user: any) => user.id === userId
    )
    setSelectedUser(selectedUserTemp)
    setPythonReview(selectedUserTemp.python_review)
    setTypescriptReview(selectedUserTemp.typescript_review)
  }

  const handlePythonReviewChange = (reviewVal: string | undefined) => {
    setPythonReview(reviewVal ? reviewVal : "")
  }

  const handleTypescriptReviewChange = (reviewVal: string | undefined) => {
    setTypescriptReview(reviewVal ? reviewVal : "")
  }

  const handleSubmit = async () => {
    // Seçilen kullanıcı, Python ve TypeScript incelemelerini kullanarak istediğiniz işlemi gerçekleştirin
    let pyResult = await updatePythonReview(selectedUser.email, pythonReview)
    let tsResult = await updateTypeScriptReview(
      selectedUser.email,
      typescriptReview
    )
    if (pyResult && tsResult) {
      setFeedbackMessage(true, "Review updated successfully")
    } else {
      setFeedbackMessage(false, "An error occured while updating review")
    }
  }
  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-3xl font-semibold text-center mb-4'>Entry Review</h2>

      <div className='bg-white p-8 border border-gray-300 rounded-md shadow-md max-w-md mx-auto'>
        <div className='mb-4'>
          <Select label='Select a User' onChange={handleUserChange}>
            {employeeLists.map((user: any) => (
              <Option key={user.id} value={user.id}>
                {`${user.first_name} ${user.last_name}`}
              </Option>
            ))}
          </Select>
        </div>

        <>
          {selectedUser && (
            <>
              <div className='mb-4'>
                <Select
                  label='Select Python Review'
                  onChange={handlePythonReviewChange}
                >
                  {ReviewOptions.map((obj: TReviewOption) => (
                    <Option key={obj.value} value={obj.value}>
                      {obj.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className='mb-4'>
                <Select
                  label='Select Typescript Review'
                  onChange={handleTypescriptReviewChange}
                >
                  {ReviewOptions.map((obj: TReviewOption) => (
                    <Option key={obj.value} value={obj.value}>
                      {obj.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </>
          )}
        </>

        <div className='grid place-items-center mt-6'>
          <Button
            onClick={handleSubmit}
            disabled={!selectedUser || !pythonReview || !typescriptReview}
          >
            Submit Review
          </Button>
        </div>

        {showFeedback && (
          <div className='absolute bottom-10 left-50 -translate-x-50'>
            <Alert
              variant='gradient'
              color={feedback.isSucces ? "green" : "red"}
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 }
              }}
            >
              {feedback.msg}
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewForm
