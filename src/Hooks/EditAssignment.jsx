const editAssignmnet = [""];

export default async function EditAssignment(name, id) {
  if (name) {
    await name.filter((item) => {
      if (item._id === id) {
        editAssignmnet.length = 0;
        editAssignmnet.push(item);
      }
    });
  }

  return editAssignmnet[0];
}
