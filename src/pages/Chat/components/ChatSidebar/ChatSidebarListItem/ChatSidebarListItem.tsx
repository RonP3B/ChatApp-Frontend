import { Fragment } from "react";
import { ChatSidebarListItemProps } from "./ChatSidebarListItemProps";
import { formatDate } from "@/shared/utils";
import { useChatActions, useSelectedChat } from "@/shared/contexts/ChatContext";
import { chatSidebarListItemStyles } from "./chatSidebarListItemStyles";
import { Badge } from "../../Badge/Badge";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Skeleton,
  ListItemText,
  Box,
  Typography,
  Avatar,
} from "@mui/material";

export const ChatSidebarListItem: React.FC<ChatSidebarListItemProps> = ({
  isLoading,
  room,
}) => {
  const chatActions = useChatActions();
  const selectedChat = useSelectedChat();

  if (isLoading) {
    return (
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={chatSidebarListItemStyles.circularSkeleton}
            />
          </ListItemIcon>
          <ListItemText
            sx={chatSidebarListItemStyles.listItemText}
            primary={
              <Box sx={chatSidebarListItemStyles.listItemTextContainer}>
                <Fragment>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton variant="text" width={80} height={12} />
                </Fragment>
              </Box>
            }
            secondary={
              <Box
                component="span"
                sx={chatSidebarListItemStyles.listItemSecondaryContainer}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                  sx={chatSidebarListItemStyles.textEllipsis}
                >
                  <Skeleton variant="text" width={150} height={12} />
                </Typography>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selectedChat?.id === room.id}
        onClick={() => chatActions.handleRoomSelection(room)}
      >
        <ListItemIcon>
          <Avatar
            alt={room.name}
            src={room.image}
            sx={chatSidebarListItemStyles.avatar}
          />
        </ListItemIcon>
        <ListItemText
          sx={chatSidebarListItemStyles.listItemText}
          primary={
            <Box sx={chatSidebarListItemStyles.listItemTextContainer}>
              <Fragment>
                <Typography
                  variant="subtitle1"
                  sx={chatSidebarListItemStyles.textEllipsis}
                >
                  {room.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={chatSidebarListItemStyles.listItemTextDate}
                  color={room.unreadMessages > 0 ? "primary" : "textSecondary"}
                >
                  {room.lastMessageDate
                    ? formatDate(new Date(room.lastMessageDate))
                    : ""}
                </Typography>
              </Fragment>
            </Box>
          }
          secondary={
            <Box
              component="span"
              sx={chatSidebarListItemStyles.listItemSecondaryContainer}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                sx={chatSidebarListItemStyles.textEllipsis}
              >
                {room.lastMessage || "No messages yet"}
              </Typography>
              {room.unreadMessages > 0 && (
                <Badge badgeContent={room.unreadMessages} />
              )}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
