import { auth, currentUser } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

import { db } from "@/lib/db"

interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found")
    }

    await db.auditLog.create({
      data: {
        ...props,
        orgId,
        userName: user.firstName + " " + user.lastName,
        userImage: user.imageUrl
      }
    })
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error)
  }
}
