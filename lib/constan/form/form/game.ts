import { IDynamicForm } from "@/types/form";

// Dynamic fields
export const createField: IDynamicForm[] = [
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
  {
    name        : 'date',
    type        : 'date',
    placeholder : 'Select date',
    fieldType   : 'date',
    label       : 'Date',
    validation  : {
      required : true,
    },
  },
]