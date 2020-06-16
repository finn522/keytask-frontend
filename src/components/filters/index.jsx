//Core
import React from 'react';
import { useFilter, changeInput } from "helpers/filter-context";
import { useAuth } from "helpers/auth-context";
//Styles
import styles from "./styles.module.scss";

function Filters(props) {
    const [{ myTask, claimedTask, openTask }, setFilter] = useFilter();
    const [{ user }] = useAuth();

    function onChange(e){
        let inputName = e.currentTarget.name;
        let value = null;
        if(inputName === "myTask"){
            value = !myTask;
        }
        else if(inputName === "claimedTask"){
            value = !claimedTask;
        }
        else{
            value = !openTask;
        }
        changeInput(inputName, setFilter, value)
    }
        return (
            <div>
                <div>
                    <label className={styles.container}>
                        Mijn taken
                        <input name="myTask" onChange={onChange} type="checkbox" checked={myTask} />
                        <span className={[styles.checkmark, styles.myTask].join(" ")}></span>
                    </label>

                    <label className={styles.container}>Geclaimde taken
                        <input name="claimedTask" onChange={onChange} type="checkbox" checked={claimedTask} />
                        <span className={[styles.checkmark, styles.claimedTask].join(" ")}></span>
                    </label>

                    <label className={styles.container}>Open taken
                        <input name="openTask" onChange={onChange} type="checkbox" checked={openTask} />
                        <span className={[styles.checkmark, styles.openTask].join(" ")}></span>
                    </label>

                    {/* <label className={styles.container}>Four
                        <input type="checkbox"/>
                        <span className={styles.checkmark}></span>
                    </label> */}
                </div>
                <div></div>
            </div>
        )   
}

export default Filters
