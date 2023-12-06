"use client";
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/redux/slices/counter'
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';

interface TestProps { }
const Test: FC<TestProps> = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Test</h1>
            <div>
                <div>
                    <Button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </Button>
                    <span>{count}</span>
                    <Button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Test;