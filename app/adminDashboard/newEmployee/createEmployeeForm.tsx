"use client";
import { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@/ui";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Checkbox } from "@material-tailwind/react";

function CreateEmployeeForm({ mail = "", company = "" }) {
  const [mailError, setMailError] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkBoxConfirm, setCheckBoxConfirm] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState({
    strength: "",
    show: false,
    validated: false,
  });
  var isContinue: boolean = false;
  const handleOpen = () => setOpen(!open);
  function checkMail(event: any) {
    var email: string = event.target.value
    if (email.endsWith(mail)) {
      setMailError(false)
    } else {
      setMailError(true)
    }
  }
  function handlePasswordChange(event: any) {
    var passwordValue = event.target.value
    const strengthChecks = {
      length: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false
    }
    strengthChecks.length = passwordValue.length >= 8 ? true : false
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue)
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue)
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue)
    let verifiedList = Object.values(strengthChecks).filter((value) => value)
    let strength =
      verifiedList.length == 4
        ? "Strong"
        : verifiedList.length >= 2
        ? "Medium"
        : "Weak"
    if (strength == "Strong")
      setPasswordValidate({
        ...passwordValidate,
        strength: strength,
        show: true,
        validated: true
      })
    else
      setPasswordValidate({
        ...passwordValidate,
        strength: strength,
        show: true,
        validated: false
      })
  }

  function handleCheckboxChange(event: any) {
    setCheckBoxConfirm(true)
  }

  function changeShowPassword() {
    if (passwordShow) setPasswordShow(false)
    else setPasswordShow(true)
  }
  return (
    <form
      className='flex flex-col justify-center gap-2 text-foreground w-full max-w-md'
      method='post'
    >
      <div className='flex flex-col justify-center gap-2'>
        <label className='text-md' htmlFor='email'>
          Email
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border '
          name='email'
          placeholder={"you@" + mail}
          required
          onBlur={checkMail}
        />
        {mailError ? (
          <label htmlFor='email' className='text-red-800'>
            Just use "{mail}" email during registration.
          </label>
        ) : (
          <></>
        )}
        <label className='text-md mt-6' htmlFor='password'>
          Password
        </label>
        <div className=' relative '>
          <input
            className='rounded-md px-4 py-2 bg-inherit border w-full relative'
            type={passwordShow ? "text" : "password"}
            name='password'
            placeholder='••••••••'
            required
            onChange={handlePasswordChange}
            onBlur={() => {
              if (
                passwordValidate.show &&
                passwordValidate.strength == "Strong"
              )
                setPasswordValidate({
                  ...passwordValidate,
                  show: false
                })
            }}
          />
          <span
            className='absolute top-0 right-0 h-full p-1 flex items-center bg-transparent text-black cursor-pointer select-none'
            onClick={changeShowPassword}
          >
            {!passwordShow ? <IconEye /> : <IconEyeOff />}
          </span>
        </div>

        {passwordValidate.show ? (
          passwordValidate.strength == "Strong" ? (
            <label className='text-green-700 text-sm '>
              Password Strength: {passwordValidate.strength}
            </label>
          ) : (
            <label className='text-gray text-sm text-red-700 '>
              Password Strength: {passwordValidate.strength}
            </label>
          )
        ) : (
          <></>
        )}
        <div className='flex gap-2 my-2'>
          <div>
            <label className='text-md mt-6' htmlFor='first_name'>
              First Name
            </label>
            <input
              className='rounded-md px-4 py-2 bg-inherit border w-full'
              type='text'
              name='first_name'
            />
          </div>
          <div>
            <label className='text-md mt-6' htmlFor='last_name'>
              Last Name
            </label>
            <input
              className='rounded-md px-4 py-2 bg-inherit border w-full'
              type='text'
              name='last_name'
            />
          </div>
        </div>
        <label className='text-md' htmlFor='company'>
          Company
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border w-full'
          type='text'
          name='company'
          value={company}
          readOnly={true}
        />
        <div className='flex gap-2 my-2'>
          <div>
            <label className='text-md mt-6' htmlFor='job'>
              Job
            </label>
            <input
              className='rounded-md px-4 py-2 bg-inherit border w-full'
              type='text'
              name='job'
            />
          </div>
          <div>
            <label className='text-md mt-6' htmlFor='role'>
              Role
            </label>
            <select
              className='rounded-md px-4 py-2 bg-inherit border w-full'
              name='role'
            >
              <option value='ADMIN'>Admin</option>
              <option value='EMPLOYEE'>Employee</option>
            </select>
          </div>
        </div>

        <Checkbox
          label='Çalışan oluşturma onay formu'
          defaultChecked={checkBoxConfirm}
          onClick={() => {
            if (checkBoxConfirm) setCheckBoxConfirm(false)
            else handleOpen()
          }}
        />
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Çalışan hesabı oluşturma</DialogHeader>
          <DialogBody>
            Sonraki aşamada kullanıcının detaylı bilgilerini gireceksiniz.
            Kullanıcı oluşturulacak onaylıyor musunuz?
          </DialogBody>
          <DialogFooter className='flex'>
            <Button
              variant='text'
              color='red'
              onClick={handleOpen}
              className='mr-1'
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant='gradient'
              color='green'
              disabled={mailError || !passwordValidate.validated}
              onClick={(event) => {
                handleOpen()
                handleCheckboxChange(event)
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </Dialog>
      </div>

      <div className='w-3/4 mx-auto flex flex-col items-center gap-2 justify-center mt-3'>
        <>
          <Button
            variant='gradient'
            disabled={
              mailError || !passwordValidate.validated || !checkBoxConfirm
            }
            formAction='/auth/sign-up-company'
            type='submit'
          >
            Create
          </Button>
        </>
      </div>
    </form>
  )
}
export default CreateEmployeeForm;
