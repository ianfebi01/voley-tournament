import { IDynamicForm } from "@/types/form";

export const loginField: IDynamicForm[] = [
  {
    name        : 'username',
    type        : 'text',
    placeholder : 'eg. ianfebi01',
    fieldType   : 'text',
    label       : 'Username',
    validation  : {
      charLength : {
        min : 3,
        max : 30,
      },
      required : true,
    },
  },
  {
    name        : 'password',
    type        : 'password',
    placeholder : 'Insert your password',
    fieldType   : 'text',
    label       : 'Password',
    validation  : {
      required : true,
    },
  },
]