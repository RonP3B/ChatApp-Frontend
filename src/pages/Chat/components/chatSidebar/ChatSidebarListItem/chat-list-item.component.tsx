import { Fragment } from "react";
import { ChatListItemProps } from "./chat-list-item.interface";
import { formatDate } from "@/shared/utils";
import { ChatListItemStyles } from "./chat-list-item.styles";
import { useChatContext } from "@/shared/contexts";
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
  const { chatContextActions, chatContextValues } = useChatContext();

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={!isLoading && chatContextValues.selectedChat?.id === room!.id}
        onClick={
          isLoading
            ? undefined
            : () => chatContextActions.handleRoomSelection(room!)
        }
      >
        <ListItemIcon>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt={room!.name}
              src={room!.image}
              sx={ChatListItemStyles.avatar}
            />
          )}
        </ListItemIcon>
        <ListItemText
          sx={ChatListItemStyles.listItemText}
          primary={
            <Box sx={ChatListItemStyles.listItemTextContainer}>
              {isLoading ? (
                <Fragment>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton variant="text" width={80} height={12} />
                </Fragment>
              ) : (
                <Fragment>
                  <Typography
                    variant="subtitle1"
                    sx={ChatListItemStyles.textEllipsis}
                  >
                    {room!.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={ChatListItemStyles.listItemTextDate}
                    color={
                      room!.unreadMessages > 0 ? "primary" : "textSecondary"
                    }
                  >
                    {room!.lastMessageDate
                      ? formatDate(new Date(room!.lastMessageDate))
                      : ""}
                  </Typography>
                </Fragment>
              )}
            </Box>
          }
          secondary={
            <Box
              component="span"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                sx={ChatListItemStyles.textEllipsis}
              >
                {isLoading ? (
                  <Skeleton variant="text" width={150} height={12} />
                ) : (
                  room!.lastMessage || "No messages yet"
                )}
              </Typography>
              {!isLoading && room!.unreadMessages > 0 && (
                <Badge badgeContent={room!.unreadMessages} />
              )}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
