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
  {
    name        : 'nextGame',
    type        : 'select',
    placeholder : 'Select next game',
    fieldType   : 'select',
    label       : 'Next Game',
    validation  : {
      required : false,
    },
  },
  {
    name        : 'gameCode',
    type        : 'select',
    placeholder : 'Select game code',
    fieldType   : 'select',
    label       : 'Game Code',
    validation  : {
      required : true,
    },
    select : {
      isMulti : false,
    },
    options : [
      {
        label : 'Quarter Final',
        value : 'quarter-final',
      },
      {
        label : 'Semi Final',
        value : 'semi-final',
      },
      {
        label : 'Final',
        value : 'final',
      }
    ]
  },
  {
    name        : 'participants',
    type        : 'select',
    placeholder : 'Select participants',
    fieldType   : 'select',
    label       : 'Participants',
    select      : {
      isMulti : true
    },
    validation : {
      required   : false,
      charLength : {
        max : 2,
      },
    },
  },
]