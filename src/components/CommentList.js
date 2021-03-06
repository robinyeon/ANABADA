import React from "react";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Image from "../elements/Image";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
    const dispatch = useDispatch();
    const comment_list = useSelector(state => state.comment.list);

    const { post_id } = props;

    React.useEffect(() => {
        if (!comment_list[post_id]) {
            dispatch(commentActions.getCommentDB(post_id));
        }
    }, []);

    if (!comment_list[post_id] || !post_id) {
        return null;
    }
    return (
        <React.Fragment>
            <Grid padding="0px 100px">
                <CommentItem />
            </Grid>
        </React.Fragment>
    )
}

CommentList.defaultProps = {
    post_id: null,
};

export default CommentList;

//댓글 아이템 하나(export안해도 됨. 위에서 map돌림)
const CommentItem = (props) => {

    const { user_profile, user_name, user_id, post_id, insert_dt, contents } = props;
    return (
        <Grid is_flex>
            <Grid is_flex width="auto">
                <Image>유저이미지</Image>
                <Text bold>{user_name}</Text>
                <Text margin="10px">{contents}</Text>
            </Grid>

            <Grid is_flex width="auto">
                <Text margin="4px">{insert_dt}</Text>
                <Text hover>X</Text>
            </Grid>
        </Grid>
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "mangsu",
    user_id: "",
    post_id: 1,
    contents: "이보시오",
    insert_dt: "2021-01-01 19:00:00",
}