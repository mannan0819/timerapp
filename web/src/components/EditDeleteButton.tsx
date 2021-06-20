import { IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import { useDeleteTimerMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  refetch: any;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  refetch,
}) => {
  // const { data: meData } = useMeQuery();
  const [deleteTimer] = useDeleteTimerMutation();

  // if (meData?.me?.id !== creatorId) {
  //   return null;
  // }

  return (
    <Box>
      {/* <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}> */}
      <IconButton
        as={Link}
        mr={4}
        icon={<EditIcon />}
        colorScheme="teal"
        aria-label="Edit Post"
      />
      {/* </NextLink> */}
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        colorScheme="teal"
        onClick={async () =>
          //   deleteTimer({
          //     variables: { id },
          //   });
          {
            await deleteTimer({
              variables: { id },
            });
            refetch();
          }
        }
      />
    </Box>
  );
};
