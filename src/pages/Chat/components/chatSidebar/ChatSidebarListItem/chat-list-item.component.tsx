import { Fragment } from "react";
import { ChatListItemProps } from "./chat-list-item.interface";
import { formatDate } from "@/shared/utils";
import { useChatActions, useSelectedChat } from "@/shared/contexts/ChatContext";
import { ChatListItemStyles } from "./chat-list-item.styles";
import { Badge } from "../../custom";
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

export const ChatListItem: React.FC<ChatListItemProps> = ({
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
              sx={ChatListItemStyles.circularSkeleton}
            />
          </ListItemIcon>
          <ListItemText
            sx={ChatListItemStyles.listItemText}
            primary={
              <Box sx={ChatListItemStyles.listItemTextContainer}>
                <Fragment>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton variant="text" width={80} height={12} />
                </Fragment>
              </Box>
            }
            secondary={
              <Box
                component="span"
                sx={ChatListItemStyles.listItemSecondaryContainer}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                  sx={ChatListItemStyles.textEllipsis}
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
            sx={ChatListItemStyles.avatar}
          />
        </ListItemIcon>
        <ListItemText
          sx={ChatListItemStyles.listItemText}
          primary={
            <Box sx={ChatListItemStyles.listItemTextContainer}>
              <Fragment>
                <Typography
                  variant="subtitle1"
                  sx={ChatListItemStyles.textEllipsis}
                >
                  {room.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={ChatListItemStyles.listItemTextDate}
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
              sx={ChatListItemStyles.listItemSecondaryContainer}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                sx={ChatListItemStyles.textEllipsis}
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
