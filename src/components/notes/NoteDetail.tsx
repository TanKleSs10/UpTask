import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const canDelete = useMemo(
    () => data?._id == note.createdBy._id,
    [data?._id, note.createdBy._id]
  );
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });

      toast.success(data);
    },
  });

  if (isLoading) return "cargando...";
  return (
    <div className="p-3 flex justify-between items-center">
      <p>
        {note.content} por:{" "}
        <span className="font-bold">{note.createdBy.name}</span>
      </p>
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-white font-bold cursor-pointer transition-colors rounded-md"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
