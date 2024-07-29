import { IDynamicForm } from "@/types/form";

export const addField: IDynamicForm[] = [
  {
    name        : 'name',
    type        : 'text',
    placeholder : 'eg. Arsenal',
    fieldType   : 'text',
    label       : 'Name',
    validation  : {
      charLength : {
        min : 3,
        max : 30,
      },
      required : true,
    },
  },
]