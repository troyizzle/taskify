import { generateLogMessage } from "@/lib/generate-log-message"
import { AuditLog } from "@prisma/client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface ActivityItemProps {
  log: AuditLog
}

export const ActivityItem = ({ log }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={log.userImage} alt="User avatar" />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {log.userName}
          </span> {generateLogMessage(log)}
        </p>
        <p>
          {format(new Date(log.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
        </p>
      </div>
    </li>
  )
}
